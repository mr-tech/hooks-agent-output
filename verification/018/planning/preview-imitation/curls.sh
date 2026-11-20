for p in / /legal/privacy /legal/terms /preview /support /message /message/m/0/edit /message/m/0/send /message/m/5 /api/auth/providers /api/auth/signin/discord '/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Fembed%2Favatars%2F0.png&w=64&q=75'; do
 printf '%s\t' "$p"; curl -s -m 60 -o /dev/null -w '%{http_code} %{redirect_url}\n' "http://127.0.0.1:3999$p"; done
