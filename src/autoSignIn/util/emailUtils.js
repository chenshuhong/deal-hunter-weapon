const nodeMailer = require("nodemailer");

const config = {
  email: {
    qq: {
      user: "1573391005@qq.com",
      from: "1573391005@qq.com",
      pass: "beiezktecujejfca",
    },
  },
};

// 通过qq邮箱发送
const sendEmailFromQQ = async (subject, html, toEmail) => {
  let cfg = config.email.qq;
  if (!cfg || !cfg.user || !cfg.pass) return;
  const transporter = nodeMailer.createTransport({
    service: "qq",
    auth: { user: cfg.user, pass: cfg.pass },
  });
  try {
    await transporter.sendMail({
      from: cfg.from,
      to: toEmail,
      subject: subject,
      html: html,
    });
    console.log("邮箱发送成功");
  } catch (e) {
    console.log("邮箱发送失败", e);
  }
};

module.exports = {
  sendEmailFromQQ,
};
