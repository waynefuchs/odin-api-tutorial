function malformedQuery(req, res) {
  res.status(401);
  res.send("Malformed query");
}

function noUserFound(req, res) {
  res.status(404);
  res.send("No user found");
}

function internalServerError(req, res) {
  res.status(500);
  res.send("Internal server error");
}

function success(req, res, data) {
  res.status(200);
  res.json(data);
}

function created(req, res, data) {
  res.status(201);
  res.json(data);
}

function updated(req, res, data) {
  res.status(200);
  res.json(data);
}

function deleted(req, res) {
  res.status(204);
  res.end();
}

export default {
  malformedQuery,
  noUserFound,
  internalServerError,
  success,
  created,
  updated,
  deleted,
};
