var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: false, anyArr: [1, 2, 3] });
});

router.get('/test/:id', (req, res, next) => {
  console.log('Handling /test/:id route');
  res.render('test', {output: req.params.id});
});

router.post('/test/submit', (req, res, next) => {
  let id = req.body.id;
  res.redirect(`/test/${id}`);
});

module.exports = router;
