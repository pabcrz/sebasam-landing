#!/bin/sh
# Requiere playwright-cli disponible y una sesión local abierta; no instala paquetes.
# Hereda PWTEST_SOCKETS_DIR del entorno y permite seleccionar PW_SESSION.
set -u
output=$(playwright-cli -s="${PW_SESSION:-b39}" --raw run-code --filename=tests/issue-39-browser.js 2>&1)
cli_status=$?
printf '%s\n' "$output"
if [ "$cli_status" -ne 0 ]; then
  printf 'ISSUE_39_WRAPPER_EXIT=%s (CLI=%s)\n' "$cli_status" "$cli_status"
  exit "$cli_status"
fi
if ! printf '%s\n' "$output" | grep -Eq 'ISSUE_39_OK"?$' || printf '%s\n' "$output" | grep -q 'FAIL'; then
  printf 'ISSUE_39_WRAPPER_EXIT=1 (CLI=%s)\n' "$cli_status"
  exit 1
fi
printf 'ISSUE_39_WRAPPER_EXIT=0 (CLI=%s)\n' "$cli_status"
