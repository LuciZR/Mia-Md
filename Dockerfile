FROM quay.io/gurusensei/guru-bot:latest

RUN git clone https://github.com/Guru322/GURU-BOT /sensei/GURU
WORKDIR /sensei/GURU
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]
