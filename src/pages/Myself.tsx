import React, { useState } from "react";
import "../assets/css/Pages.css";
import MyImage from "../assets/img/image.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validation = Yup.object().shape({
  comment: Yup.string().required("コメントは必須です"),
});

const Intro: React.FC = () => {
  const [comment, setComment] = useState<string[]>([]);

  const handleSubmit = (
    values: { comment: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      text: values.comment,
    };

    setComment((prevComments) => [...prevComments, newComment.text]);
    resetForm();
  };

  return (
    <>
      <main className="flex">
        <img src={MyImage} alt="jpg" />
        <div className="main">
          <h2>プロフィール</h2>
          <br />
          <table className="table">
            <tbody>
              <tr>
                <th>名前</th>
                <td>長谷川匠</td>
              </tr>
              <tr>
                <th>生年月日</th>
                <td>1997年12月1日</td>
              </tr>
              <tr>
                <th>出身地</th>
                <td>愛知県</td>
              </tr>
              <tr>
                <th>趣味</th>
                <td>音楽、車、プログラミング勉強</td>
              </tr>
              <tr>
                <th>ひとこと</th>
                <td>
                  DJやバーテンダーをしてました！
                  <br />
                  プログラミング頑張ります！
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div className="center">
        <h2>コメント入力</h2>
        <p>好きな音楽など気軽に書いてください^^</p>
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={validation}
          onSubmit={handleSubmit}>
          <Form>
            <Field name="comment" as="textarea" />
            <ErrorMessage name="comment" component="div" />
            <br />
            <button type="submit">投稿する</button>
          </Form>
        </Formik>
      </div>
      <div className="center">
        <h2>コメント一覧</h2>
        <ul>
          {comment.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Intro;
