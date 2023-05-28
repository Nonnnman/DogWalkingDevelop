import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DogWalkerDetail = () => {
  const { id } = useParams();
  const [dogWalker, setDogWalker] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // 根据id获取遛狗者的详细信息GetDogWalkerByID
    // 可以使用适当的API请求或数据获取方法RequestData
    // 并将获取的数据设置到dogWalker状态中

    // 示例代码
    fetch(`/api/dogwalkers${id}`)
      .then((response) => response.json())
      .then((data) => setDogWalker(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();

    // 提交评论和打分的逻辑submit comment and rating
    // 可以使用适当的API请求或方法将评论和打分发送到后端send to backend

    // 示例代码
    const reviewData = {
      rating: rating,
      comment: comment,
      dogWalkerId: id,
    };

    fetch(`/api/dogwalkers/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        // 根据需要处理成功提交评论的逻辑
        console.log("Review submitted successfully", data);
        // 清空打分和评论输入框 clear
        setRating(0);
        setComment("");
      })
      .catch((error) => {
        // 根据需要处理提交评论失败的逻辑
        console.error("Error submitting review", error);
      });
  };

  return (
    <div>
      {dogWalker ? (
        <div>
          <h1>{dogWalker.name}</h1>
          <p>Description: {dogWalker.experience}</p>
          <p>Review: {dogWalker.comment}</p>
          {/* 显示当前平均评分showAveragePoint */}
          <p>Average Rating: {dogWalker.avgRating}</p>

          <h2>Leave a Review</h2>
          <form onSubmit={handleSubmitReview}>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={handleRatingChange}
                min="1"
                max="5"
                required
              />
            </div>
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit Review</button>
          </form>

          {/* 显示遛狗者的评论列表 showReview*/}
          <h2>Reviews</h2>
          {dogWalker.reviews.length > 0 ? (
            <ul>
              {dogWalker.reviews.map((review) => (
                <li key={review.id}>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                  {/* 显示评论作者或其他信息showOtherInfo */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      ) : (
        <p>Loading dog walker details...</p>
      )}
    </div>
  );
};

export default DogWalkerDetail;
