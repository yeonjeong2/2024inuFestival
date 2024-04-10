const express = require('express');
const router = express.Router();
const db = require('./database');

// 댓글 작성
router.post('/:post_id/POST/comment', (req, res) => {

    const { contents, user_id, post_id } = req.body;

    nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = (nowDate.getMonth() + 1).toString().padStart(2, '0');
    const day = nowDate.getDate().toString().padStart(2, '0');

    date = year + '-' + month + '-' + day;

    if (!contents) {
        res.status(400);
        res.send({
            message : "comment 내용 작성 필요"
        });
    } 

    db.query('INSERT INTO comment (contents, date, user_id, post_id) VALUES (?, ?, ?, ?)', [contents, date, user_id, post_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.send({
                message: "댓글 저장에 실패했습니다"
            });
        } else {
            res.status(200);
            res.send({
                message : "댓글 작성에 성공했습니다!"
            });
        }
    });
});

// 댓글 리스트 조회
router.get('/:post_id/GET/comment', (req, res) => {
    const post_id = req.params.post_id;

    db.query('SELECT * FROM comment WHERE post_id = ?', [post_id], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500);
            res.send({
                message: "댓글 조회에 실패했습니다."
            });
        } else {
            if(result.length === 0) {
                res.status(404);
                res.send({
                    message: "해당 게시물이 존재하지 않습니다."
                });
            } else {
                const comment = result.map(row => ({
                    id: row.user_id,
                    comment: row.contents
                }));
                res.status(200);
                res.send({
                    comments: comment,
                    message : "댓글 리스트 조회 성공"
                })
            }
        }
    })
})

module.exports = router;