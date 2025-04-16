// Mengimpor modul yang diperlukan
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config(); // Memuat file .env untuk environment variables

// Fungsi untuk melakukan scraping berita terkini
const scrapeNewsTerkini = async (url) => {
  try {
    const response = await axios.get(url);

    // Memastikan response status OK
    if (response.status !== 200) {
      throw new Error('Failed to fetch the data');
    }

    const $ = cheerio.load(response.data);
    let articles = [];

    // Menargetkan setiap <li> dengan class yang sesuai
    $('li.d-flex.position-relative.img-hover.mb-3').each((index, element) => {
      const title = $(element).find('.mb-2.h3').text().trim();
      const imgSrc = $(element).find('img').attr('src');
      const urlNew = $(element).find('a').attr('href');
      const date = $(element).find('.bi-clock-fill + small').text().trim();
      const author = $(element).find('.bi-person-fill + small').text().trim();
      const views = $(element).find('.bi-eye-fill + small').text().trim();
      const content = $(element).find('p').first().text().trim();

      articles.push({
        title,
        imgSrc: imgSrc ? `${process.env.BERITA_IMAGE_BASE_URL}${imgSrc}` : null, // Menggunakan URL gambar dari environment
        urlNew: `${process.env.BERITA_BASE_URL}${urlNew}`, // Menggunakan URL berita dari environment
        date,
        author,
        views,
        content
      });
    });

    return articles;
  } catch (error) {
    console.error('Error scraping data:', error);
    throw new Error('Error scraping data');
  }
};

// Fungsi untuk scraping berita BUMD
const scrapeNewsBUMD = async () => {
  const url = process.env.BERITA_BASE_URL; // Menggunakan URL dari environment

  try {
    const { data, status } = await axios.get(url);

    if (status !== 200) {
      throw new Error('Failed to fetch the data');
    }

    const $ = cheerio.load(data);
    let articles = [];

    // Menargetkan elemen dengan class .col-lg-4 yang berisi berita
    $('.col-lg-4').each((index, element) => {
      const title = $(element).find('.fw-bold').text().trim() || "No Title"; // Menangani title kosong
      const imgSrc = $(element).find('img').attr('src');
      const urlNew = $(element).find('a').attr('href');
      const date = $(element).find('.bi-clock-fill + small').text().trim();
      const author = $(element).find('.bi-person-fill + small').text().trim();
      const views = $(element).find('.bi-eye-fill + small').text().trim();

      const fullImgSrc = imgSrc ? `${process.env.BERITA_IMAGE_BASE_URL}${imgSrc.replace('https://multimedia.beritajakarta.id', '')}` : null;

      articles.push({
        title,
        imgSrc: fullImgSrc,
        urlNew: `${process.env.BERITA_BASE_URL}${urlNew}`, // Menambahkan BERITA_BASE_URL
        date,
        author,
        views,
        content: title // Menggunakan title sebagai konten sementara
      });
    });

    if (articles.length === 0) {
      return { message: 'No news found' };
    }

    return articles;
  } catch (error) {
    console.error('Error scraping data:', error);
    throw new Error('Error scraping data');
  }
};

// Endpoint untuk mendapatkan berita BUMD
exports.getBeritaBUMD = async (req, res) => {
  try {
    const data = await scrapeNewsBUMD();
    res.json({
      code: 0,
      message: 'sukses',
      data: data,
    });
  } catch (err) {
    res.status(500).json({ code: 1, message: 'Gagal scraping', error: err.message });
  }
};

// Endpoint untuk mendapatkan berita terkini
exports.getBeritaTerkini = async (req, res) => {
  try {
    const result = await scrapeNewsTerkini(process.env.BERITA_BASE_URL);
    res.json({
      code: 0,
      message: 'sukses',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 1, message: 'gagal', data: [] });
  }
};
