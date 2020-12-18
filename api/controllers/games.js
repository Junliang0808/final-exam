const Game = require('../models/game');

exports.index = async (req, res, next) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);

    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
}


exports.create = async (req, res, next) => {

  console.log('req.body -> :', req.body)
  const {
    title,
    publisher,
    rating
  } = req.body;

  var mygame = new Game({
    title,
    publisher,
    rating
  })
  Game.find({
    publisher,
    title,
  }, async (err, doc) => {
      console.log('doc -> :', doc)
      if (doc && doc.length) {
          return res.json({ code: 500, msg: 'Game already exists' })
      }

      try {
          await mygame.save()
          res.json({ code: 200, msg: 'success' })
      } catch (error) {
          console.log('error -> :', error)
          next(error);
      }
  })
};

exports.update = async (req, res, next) => {
  try {
    const { _id, title, publisher, rating } = req.body;
  
    const gm = await Game.findOneAndUpdate({ _id: _id }, {
      title,
      publisher,
      rating
    });

    res.status(200).json({ message: "Game was updated successfully", game: gm });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { _id } = req.body;
    await Game.findOneAndDelete({ _id: _id });

    res.status(200).json({ message: "Game was deleted successfully" });
  } catch (error) {
    next(error);
  }
};