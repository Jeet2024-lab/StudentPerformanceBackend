router.post("/:studentId", saveMarks);

router.get("/student/:studentId", getMarks);

router.put("/:id", updateMarks);     // later

router.delete("/:id", deleteMarks); // later