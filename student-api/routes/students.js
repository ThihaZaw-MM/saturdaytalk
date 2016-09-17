var mongojs = require("mongojs");
var express = require("express");
var router = express.Router();


var db = mongojs('Student', ['students']);


//Get all students
router.get("/", function(req, res) {
	db.students.find({}, function(err, data) {
			res.status(200).json(data);
	});
});

//Get one student
router.get("/:id", function(req, res) {
	var iid = req.params.id;

	db.students.findOne({_id: mongojs.ObjectId(iid)}, function(err, data) {
		if(data) res.status(200).json(data);
		else res.sendStatus(400);
	});
});

//Create a new student
router.post("/", function(req, res) {

	var newStudent = {
		studentName: req.body.studentName,
		rollNumber: req.body.rollNumber,
		gender: req.body.gender,
		fatherName: req.body.fatherName,
		submittedAt: new Date()
	};

	db.students.insert(newStudent, function(err, data) {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	});
});

//Update an student
router.put("/:id", function(req, res) {
	var iid = req.params.id;

	var newData = {
		studentName: req.body.studentName,
		rollNumber: req.body.rollNumber,
		gender: req.body.gender,
		fatherName: req.body.fatherName,
		modifiedAt: new Date()
	};

	db.students.update(
		{ _id: mongojs.ObjectId(iid) },
		{ $set: newData },
		{ multi: false},
		function(err, data) {
			if(err) res.status(500).json(err);
			else res.status(200).json(data);
		}
	);
});

//Delete an student
router.delete("/:id", function(req, res) {
	var iid = req.params.id;

	db.students.remove({ _id: mongojs.ObjectId(iid)}, function(err, data) {
			if(data) res.status(200).json(data);
			else res.sendStatus(404);
	});
});

module.exports = router;