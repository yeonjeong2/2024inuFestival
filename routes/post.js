const express = require('express');
const router = express.Router();
const db = require('./database');

// 게시글 작성
router.post('/postWrite', (req, res) => {
    const { title, contents, user_id, date } = req.body;
    const likes = 0;
    // 다 문자열로 넘어오는 경우가 있음
    // typeof title === "string";
    // 게시글 작성 쿼리 

    db.query('INSERT INTO post (title, contents, user_id, date, likes) VALUES (?, ?, ?, ?, ?)', 
    [title, contents, user_id, date, likes], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500);
            res.send({
                message: "게시글 저장에 실패했습니다"
            });
            // res.sendStatus(500);
            return;    
        } else {
            res.status(200);
            res.send({
                message: "게시글 저장에 성공했습니다!"
            });
        }
    });
});

// 게시글 조회
router.get('/post/:post_id', (req, res) => {
    const post_id = req.params.post_id;

    db.query('SELECT * FROM post WHERE post_id = ?', [post_id], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500);
            res.send({
                message: "게시글 조회에 실패했습니다."
            });
        } else {
            if(result.length === 0) {
                res.status(404);
                res.send({
                    message: "해당 게시물이 존재하지 않습니다."
                });
            } else {
                const post = result[0];
                res.status(200).json(post);
            }
        }
    })
})

// 게시글 좋아요 업데이트
router.patch('/post/:post_id/like', (req, res) => {
    const post_id = req.params.post_id;

    db.query('SELECT likes FROM post WHERE post_id = ?', [post_id], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500);
            res.send({
                message: "좋아요 수 조회에 실패했습니다."
            });
        } else {
            const likes = result[0].likes + 1;

            db.query('UPDATE post SET likes = ? WHERE post_id = ?', [likes, post_id], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500);
                    res.send({
                        message: "좋아요 수 업데이트 실패"
                    });
                } else {
                    res.status(200);
                    res.send({
                        message: "좋아요 1 증가",
                        likes: likes
                    });
                }
            });
        }
    });
})

module.exports = router;