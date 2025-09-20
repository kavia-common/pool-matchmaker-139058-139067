#!/bin/bash
cd /home/kavia/workspace/code-generation/pool-matchmaker-139058-139067/frontend_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

