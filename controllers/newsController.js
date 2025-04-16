const axios = require('axios');
const cheerio = require('cheerio');

const getNewsData = async (req, res) => {
  try {
    const category = req.query.category || 1;  // Default ke kategori 1
    const URL = `https://m.beritajakarta.id/en/category/${category}/rss`; // URL dinamis

    // Ambil halaman HTML
    const { data } = await axios.get(URL);
    // console.log(data)
    // Muat data HTML ke cheerio
    const $ = cheerio.load(data);

    // Ambil data berita
    const news = [];
    $('item').each((index, element) => {
      const title = $(element).find('title').text();
      const link = $(element).find('link').text();
      const pubDate = $(element).find('pubDate').text();
      const description = $(element).find('description').text();
      const image = $(element).find('enclosure').attr('url');

      news.push({
        title,
        link,
        published: pubDate,
        summary: description,
        image: image || null,
      });
    });

    // Kirimkan data berita sebagai respons JSON
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data berita' });
  }
};

module.exports = {
  getNewsData,
};
