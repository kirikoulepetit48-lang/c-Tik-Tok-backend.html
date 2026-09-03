const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());

app.get('/', (req,res) => res.json({
  status: '✅ C-TIK-TOK BACKEND LIVE - GLOBAL 🌍',
  usage: 'POST /generate {url: "https://monsite.com"}'
}));

app.post('/generate', async (req,res) => {
  const { url, lang='fr' } = req.body;
  if(!url) return res.status(400).json({error:'url required'});

  try {
    console.log('🔗 Analyse:', url);
    const pageRes = await fetch(url);
    const html = await pageRes.text();

    const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.slice(0,100) || url;
    const desc = html.match(/name="description" content="(.*?)"/i)?.[1]?.slice(0,150) || 'Plateforme incroyable';
    const siteName = new URL(url).hostname.replace('www.','');

    // Screenshot via Microlink (léger pour Render)
    let screenshotUrl = '';
    try {
      const ssApi = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;
      const ssRes = await fetch(ssApi);
      const ssData = await ssRes.json();
      screenshotUrl = ssData.data?.screenshot?.url || '';
    } catch(e){ console.log('Screenshot fail, on continue'); }

    // SCRIPT 30s que tu as défini
    const script = {
      hook: `Tu perds encore des heures à faire tes vidéos? 😱`,
      problem: `Créer du contenu prend trop de temps...`,
      show: `Voici ${title}. ${desc}.`,
      benefits: ['⚡ RAPIDE','🤖 INTELLIGENT','📱 SIMPLE'],
      cta: `Lien en bio 👇 Teste ${siteName} maintenant! 🚀`,
      siteName, title
    };

    res.json({ siteInfo: { title, desc, siteName }, screenshotUrl, script });

  } catch(e){
    res.status(500).json({error: e.message});
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('LIVE on '+PORT));
