bash

python3 << 'EOF'
with open('/mnt/user-data/outputs/api/chat.js', 'r') as f:
    content = f.read()

content = content.replace('claude-sonnet-4-20250514', 'claude-sonnet-4-5-20251001')

with open('/mnt/user-data/outputs/api/chat.js', 'w') as f:
    f.write(content)

print("Updated:", 'claude-sonnet-4-5-20251001' in content)
print(content)
EOF
Output

Updated: True
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20251001',
        max_tokens: 1000,
        system,
        messages
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

