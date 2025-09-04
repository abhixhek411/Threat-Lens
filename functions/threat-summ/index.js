import axios from 'axios';

export default async function (context) {
  try {
    const body = JSON.parse(context.req.bodyRaw || '{}');
    context.log('✅ Parsed body:', body);

    const { type, content } = body;

    if (!type || !content) {
      context.error('❌ Missing type or content');
      return context.res.json({ error: '❌ Missing type or content' });
    }

    const prompt = `
You are a cybersecurity analyst. Analyze the following ${type} and provide:

- Threat Type
- Risk Score (0–100)
- Summary
- Remediation Steps (bullet points)

Content:
${content}
`;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      context.error('❌ Missing Groq API Key');
      return context.res.json({ error: '❌ Missing Groq API Key' });
    }

    
    // console.log(response);

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log(response);

    const result = response.data.choices[0].message.content || '';
    context.log('🟢 Groq response:', result);

    const riskScore = result.match(/\*\*Risk Score:\*\*\s*(\d+)/i)?.[1] || '0';
    const threatType = result.match(/\*\*Threat Type:\*\*\s*(.*)/i)?.[1]?.trim() || 'Unknown';
    const summary = result.split('Summary:')[1]?.trim() || result;
    const remediation = result.split('Remediation')[1]?.trim() || 'No suggestions.';

    return context.res.json({ threatType, riskScore, summary,remediation});

  } catch (err) {
    context.error('❌ Groq Error:', err.message || err);
    context.error(err.response?.data || err);
    return context.res.json({ error: '❌ Error analyzing threat with Groq.' });
  }
}
