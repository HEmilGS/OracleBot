TARGET_URL="http://140.84.181.47/"

OUTPUT_FILE="result.xml"

echo "Descargando OWASP ZAP Docker..."
docker pull ghcr.io/zaproxy/zaproxy:stable

echo "Ejecutando escaneo en $TARGET_URL ..."
docker run -v "$(pwd)":/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap.sh \
  -cmd -quickurl "$TARGET_URL" -quickout /zap/wrk/$OUTPUT_FILE

echo "Escaneo completado. Revisa el archivo $OUTPUT_FILE"

