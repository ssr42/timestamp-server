npm install && (cd public/client && npm install )
PORT=${1:-8000}
PASSWORD=${2:-secret}
npm start -- --port $PORT --password $PASSWORD
