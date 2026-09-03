const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> res.send('C TIK TOK AUTO Backend - LIVE 🚀'));

app.post('/generate', async (req,res)=>{
  const {url} = req.body;
  if(!url) return res.status(400).json({error:'url required'});

  // Capture via API gratuite (pas de puppeteer)
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  // IA simple qui comprend le site
  let title = url.replace('https://','').split('/')[0];
  if(url.includes('c-photo')) title = 'C PHOTO - AI Photo Enhancer';
  if(url.includes('c-generator')) title = 'C GENERATOR';
  if(url.includes('c-chat')) title = 'C CHAT AI';

  const script = {
    hook: `Tu perds encore des heures à faire tes vidéos? 😱`,
    problem: `Tu galères avec ${title}?`,
    show: `Regarde ${title} - ça change tout!`,
    benefits: ['⚡ Rapide', '🤖 Intelligent', '📱 Simple'],
    cta: `Lien en bio 👇 Teste ${title} maintenant! 🚀`,
    title: title
  };

  res.json({
    siteInfo: {title, url},
    screenshotUrl: screenshotUrl,
    script: script
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('LIVE on '+PORT));
