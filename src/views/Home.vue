<template>
  <div class="home">
    <Navbar />
    <!-- <router-view /> -->
    <div class="tweets">
      <CreateTweet />
      <Tweets :initial-user-tweets="userTweets" />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import CreateTweet from './../components/CreateTweet.vue'
import Tweets from './../components/Tweets'
import { Toast } from './../utils/helpers'
import tweetsAPI from './../apis/tweets'

// 模擬 API 傳進來的資料
// const dummyData = {
//   userTweets: [
//     {
//       id: 1,
//       UserId: 2,
//       description: 'user1 said: uia ut ut',
//       createdAt: '2021-12-19T23:41:23.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 2,
//       UserId: 2,
//       description: 'user1 said: ste',
//       createdAt: '2021-12-28T19:10:52.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 3,
//       UserId: 2,
//       description: 'user1 said: liquam',
//       createdAt: '2022-01-11T19:57:56.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 4,
//       UserId: 2,
//       description:
//         'user1 said: t illum voluptatibus et aperiam placeat voluptate',
//       createdAt: '2021-11-26T02:31:07.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 5,
//       UserId: 2,
//       description:
//         'user1 said: ut dolorem sint corrupti maiores repellendus inci',
//       createdAt: '2022-01-20T03:55:11.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 6,
//       UserId: 2,
//       description:
//         'user1 said: ulpa autem quam iste. Animi molestiae vel commodi',
//       createdAt: '2021-11-13T00:34:04.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 7,
//       UserId: 2,
//       description:
//         'user1 said: mnis nesciunt enim. Aut quaerat veniam reprehende',
//       createdAt: '2022-02-21T10:33:08.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 8,
//       UserId: 2,
//       description:
//         'user1 said: umque qui facilis assumenda qui ut ut. Est et inv',
//       createdAt: '2022-02-13T06:19:25.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 9,
//       UserId: 2,
//       description:
//         'user1 said: olestias dolor ut id suscipit necessitatibus face',
//       createdAt: '2022-02-17T23:32:13.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 10,
//       UserId: 2,
//       description:
//         'user1 said: el quod facilis rerum labore neque id placeat. Qu',
//       createdAt: '2021-12-06T04:37:44.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 2,
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         password:
//           '$2a$10$0q.ob7AvER9OWznv0Uj33OHm6Y.lHLDLuZAcY7MCAWxexwdMgpmDK',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 11,
//       UserId: 3,
//       description:
//         'user2 said: d sed enim quos nostrum dolores culpa.\nRerum quod',
//       createdAt: '2022-01-22T13:43:59.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 12,
//       UserId: 3,
//       description:
//         'user2 said: apiente quia enim. Vel iste quia iusto ipsa. Non ',
//       createdAt: '2022-02-02T22:17:28.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 13,
//       UserId: 3,
//       description:
//         'user2 said: ut reprehenderit consequatur consequatur dolores ',
//       createdAt: '2021-11-02T10:07:49.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 14,
//       UserId: 3,
//       description: 'user2 said: ut et voluptatibus sit quibusdam hic sit eos.',
//       createdAt: '2022-02-05T21:37:05.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 15,
//       UserId: 3,
//       description:
//         'user2 said: uo pariatur consectetur reiciendis deleniti et mi',
//       createdAt: '2021-11-05T23:19:49.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 16,
//       UserId: 3,
//       description: 'user2 said: periam',
//       createdAt: '2021-11-23T09:33:20.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 17,
//       UserId: 3,
//       description:
//         'user2 said: t quia itaque facere aperiam ut alias quo fugiat.',
//       createdAt: '2021-11-07T20:15:32.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 18,
//       UserId: 3,
//       description: 'user2 said: icta',
//       createdAt: '2022-01-21T12:31:19.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 19,
//       UserId: 3,
//       description:
//         'user2 said: apiente consequatur earum dolor. Possimus nam err',
//       createdAt: '2022-01-03T22:02:30.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 20,
//       UserId: 3,
//       description:
//         'user2 said: arum voluptas consequatur.\nNam beatae fugiat at p',
//       createdAt: '2021-11-05T21:30:44.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 3,
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         password:
//           '$2a$10$RDPe/QN1XMyKCIMWv805iuTPME/cYmhMm2V5dF7ni2tJISmPfmJQa',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 21,
//       UserId: 4,
//       description:
//         'user3 said: oluptates voluptas repellat assumenda ex eum reru',
//       createdAt: '2021-12-23T03:42:03.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 22,
//       UserId: 4,
//       description:
//         'user3 said: ucimus autem suscipit eveniet ut. Recusandae volu',
//       createdAt: '2022-02-12T07:09:24.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 23,
//       UserId: 4,
//       description:
//         'user3 said: epellat nobis culpa perspiciatis nihil. Minus ea ',
//       createdAt: '2021-12-29T13:55:57.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 24,
//       UserId: 4,
//       description:
//         'user3 said: nventore et nemo aut ut quidem est. Sunt autem si',
//       createdAt: '2022-02-14T08:13:20.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 25,
//       UserId: 4,
//       description: 'user3 said: ossimus incidunt sunt',
//       createdAt: '2022-01-24T11:12:46.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 26,
//       UserId: 4,
//       description: 'user3 said: rror ut id omnis esse velit et sed cupiditate.',
//       createdAt: '2021-11-05T09:47:08.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 27,
//       UserId: 4,
//       description: 'user3 said: usto voluptatem enim',
//       createdAt: '2022-01-18T00:37:39.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 28,
//       UserId: 4,
//       description: 'user3 said: uam voluptates et',
//       createdAt: '2022-01-19T23:05:51.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 29,
//       UserId: 4,
//       description:
//         'user3 said: uas totam repellendus ad quasi qui sed provident.',
//       createdAt: '2021-12-26T14:03:03.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 30,
//       UserId: 4,
//       description: 'user3 said: uam earum quia',
//       createdAt: '2021-11-14T23:58:51.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 4,
//       User: {
//         id: 4,
//         account: 'user3',
//         name: 'user3',
//         email: 'user3@example.com',
//         password:
//           '$2a$10$44jn2bdbX.qOF3i1hmoheu9QmyaK3i3KGXkJvyVPS8CwkZQd7EiTC',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 31,
//       UserId: 5,
//       description:
//         'user4 said: erum molestiae in debitis. Qui alias fugit consec',
//       createdAt: '2022-01-30T21:58:09.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 32,
//       UserId: 5,
//       description:
//         'user4 said: upiditate voluptatum officia est et ut. Aut perfe',
//       createdAt: '2022-01-21T07:47:03.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 33,
//       UserId: 5,
//       description:
//         'user4 said: olestiae ipsam rerum.\nRepudiandae ad ipsum offici',
//       createdAt: '2021-11-24T11:43:11.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 34,
//       UserId: 5,
//       description:
//         'user4 said: ed quia et eos autem labore nam. Quidem corrupti ',
//       createdAt: '2022-01-21T15:30:57.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 35,
//       UserId: 5,
//       description:
//         'user4 said: oluptate nihil corrupti laborum cupiditate omnis ',
//       createdAt: '2022-02-14T09:17:46.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 36,
//       UserId: 5,
//       description:
//         'user4 said: acilis et ut illo sequi perspiciatis officia pari',
//       createdAt: '2021-12-16T22:39:32.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 37,
//       UserId: 5,
//       description: 'user4 said: ccusamus soluta sit',
//       createdAt: '2022-02-15T10:41:19.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 38,
//       UserId: 5,
//       description: 'user4 said: eserunt cupiditate harum distinctio.',
//       createdAt: '2021-12-02T21:19:44.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 39,
//       UserId: 5,
//       description:
//         'user4 said: rchitecto modi assumenda provident eos eveniet of',
//       createdAt: '2021-12-20T03:22:36.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 40,
//       UserId: 5,
//       description:
//         'user4 said: mnis harum voluptatibus eius. Doloribus quis vero',
//       createdAt: '2022-01-17T01:08:18.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 5,
//       User: {
//         id: 5,
//         account: 'user4',
//         name: 'user4',
//         email: 'user4@example.com',
//         password:
//           '$2a$10$Zc2o8hLRR5o0DMizPNR8le4YMG5SXoZbkAbJXWGFGrgGU6F8SXmou',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 41,
//       UserId: 6,
//       description:
//         'user5 said: mnis et quisquam deserunt. Ipsam omnis qui ullam ',
//       createdAt: '2022-02-01T22:24:41.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 42,
//       UserId: 6,
//       description: 'user5 said: xcepturi',
//       createdAt: '2021-12-30T19:44:34.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 43,
//       UserId: 6,
//       description: 'user5 said: on',
//       createdAt: '2021-12-29T04:38:44.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 44,
//       UserId: 6,
//       description: 'user5 said: olorum fugiat rem repudiandae ad.',
//       createdAt: '2022-02-18T19:09:15.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 45,
//       UserId: 6,
//       description:
//         'user5 said: aiores iure asperiores quae similique nemo consec',
//       createdAt: '2022-01-18T20:00:27.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 46,
//       UserId: 6,
//       description:
//         'user5 said: dipisci sunt exercitationem cumque qui suscipit i',
//       createdAt: '2021-12-01T09:53:29.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 47,
//       UserId: 6,
//       description:
//         'user5 said: st inventore omnis non similique eum.\nVel sunt ex',
//       createdAt: '2021-11-10T00:29:00.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 48,
//       UserId: 6,
//       description:
//         'user5 said: int nostrum possimus omnis nobis et. Quos est eli',
//       createdAt: '2021-12-29T12:44:32.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 49,
//       UserId: 6,
//       description:
//         'user5 said: epellendus sed omnis dolorum officiis ut molestia',
//       createdAt: '2021-12-15T03:51:45.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//     {
//       id: 50,
//       UserId: 6,
//       description:
//         'user5 said: olorem dolorum excepturi. Pariatur quidem asperna',
//       createdAt: '2022-02-08T13:24:19.000Z',
//       updatedAt: '2022-02-25T15:21:11.000Z',
//       userId: 6,
//       User: {
//         id: 6,
//         account: 'user5',
//         name: 'user5',
//         email: 'user5@example.com',
//         password:
//           '$2a$10$v5ciY.GmR6BByGzzvAnLPOlXUKJowHrvskJWbV7Tdw8d1NUtH29hW',
//         role: 'user',
//         avatar: null,
//         introduction: null,
//         cover: null,
//         createdAt: '2022-02-25T15:21:10.000Z',
//         updatedAt: '2022-02-25T15:21:10.000Z',
//       },
//     },
//   ],
// }
export default {
  name: 'Home',
  components: {
    Navbar,
    CreateTweet,
    Tweets,
  },
  data() {
    return {
      userTweets: [],
    }
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.get()

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        this.userTweets = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試',
        })
      }
    },
  },
  created() {
    this.fetchTweets()
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding: 0 8%;

  .tweets {
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    height: 100%;
    background: #e5e5e5;
    overflow-y: scroll;
  }

  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>
