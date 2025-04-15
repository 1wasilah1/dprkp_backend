const Content = require('../models/ContentModel');

exports.createOrUpdateContent = async (req, res) => {
  try {
    const { mainTitle, mainDescription, tabs } = req.body;
    let imagePaths = req.body.imagePaths;

    if (typeof imagePaths === 'string') {
      imagePaths = [imagePaths];
    }

    let parsedTabs = [];

    if (tabs) {
      // Jika dikirim sebagai JSON string
      parsedTabs = JSON.parse(tabs);
      parsedTabs.forEach((tab, index) => {
        if (imagePaths && imagePaths[index]) {
          tab.image = imagePaths[index];
        }
      });
    } else if (req.body.title && req.body.description) {
      const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
      const descriptions = Array.isArray(req.body.description) ? req.body.description : [req.body.description];

      parsedTabs = titles.map((t, i) => ({
        title: t,
        description: descriptions[i] || '',
        image: imagePaths?.[i] || null,
      }));
    }

    // Cari content pertama (hanya 1 konten global)
    let content = await Content.findOne();
    if (content) {
      content.title = mainTitle;
      content.description = mainDescription;
      content.tabs = parsedTabs;
    } else {
      content = new Content({
        title: mainTitle,
        description: mainDescription,
        tabs: parsedTabs,
      });
    }

    await content.save();
    res.status(200).json({ message: 'Content saved successfully', content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getContent = async (req, res) => {
    try {
      // Logika untuk mengambil konten dari database atau file
      const content = await Content.findOne(); // Contoh mengambil data konten
      res.status(200).json({ message: 'Content fetched successfully', content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching content' });
    }
};
