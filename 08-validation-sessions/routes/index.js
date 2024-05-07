var express = require('express');
var router = express.Router();
var { body, validationResult} = require('express-validator');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express', condition: false, anyArr: [1, 2, 3] });
// });

router.get('/test/:id', (req, res, next) => {
  console.log('Handling /test/:id route');
  res.render('test', {output: req.params.id});
});

router.post('/test/submit', (req, res, next) => {
  let id = req.body.id;
  res.redirect(`/test/${id}`);
});

router.get('/', function(req, res, next) {
  res.render(
    'index',
    {
      title: 'Form validation',
      success: req.session.success,
      errors: req.session.errors
    }
  );
  req.session.errors = null;
  req.session.success = null;
});

const customValidation = (value, { req }) => {
  if (req.body.confirmPassword !== req.body.password) {
    throw new Error('Password is invalid');
  }

  return true;
}

const validateField = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({min: 4})
    .custom(customValidation)
];

router.post('/submit', validateField, (req, res, next) => {
  let errors = validationResult(req);

  console.log("errors: ", errors);

  if (!errors.isEmpty()) {
    req.session.errors = errors.array();
    req.session.success = false;
  } else {
    req.session.success = true;
  }

  res.redirect('/');
});


module.exports = router;
