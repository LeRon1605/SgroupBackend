import 'dotenv/config';

import MailService from '../src/services/mail.service.js';

const mails = [
    { mail: 'namvietanh2002@gmail.com', subject: 'Xin chào', content: 'Chào nhân viên Datahouse Asia' },
    { mail: 'namvietanh2002@gmail.com', subject: 'Xin chào', content: 'Chào nhân viên Datahouse Asia' },
    { mail: 'namvietanh2002@gmail.com', subject: 'Xin chào', content: 'Chào nhân viên Datahouse Asia' },
    { mail: 'namvietanh2002@gmail.com', subject: 'Xin chào', content: 'Chào nhân viên Datahouse Asia' },
    { mail: 'namvietanh2002@gmail.com', subject: 'Xin chào', content: 'Chào nhân viên Datahouse Asia' }
];

mails.forEach(async x => {
    await MailService.sendMail(x.mail, x.subject, x.content);
})