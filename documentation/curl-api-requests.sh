curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "model": "gpt-4o-mini",
    "store": true,
    "messages": [
      {"role": "user", "content": "write a haiku about ai"}
    ]
  }'
