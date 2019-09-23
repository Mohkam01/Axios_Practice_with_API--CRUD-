import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Table extends Component {
  state = {
    userId: "",
    id: null,
    title: "",
    body: "",
    data: []
  };
  async componentDidMount() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ data });
    console.log(data);
  }
  handleId = (e) => {
    this.setState({ userId: e.target.value });
  };
  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  handleBody = (e) => {
    this.setState({ body: e.target.value });
  };
  handleAdd = async (e) => {
    e.preventDefault();
    console.log("in hanlde");
    if (
      this.state.userId === "" ||
      this.state.title === "" ||
      this.state.body === ""
    ) {
      console.log("kindly enter all values");
    } else {
      const obj = {
        userId: parseInt(this.state.userId),
        title: this.state.title,
        body: this.state.body
      };
      const { data: post } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        obj
      );
      console.log(post);
      // post.id = post.id + 1;
      const count = this.state.data.length;
      // console.log(count);
      post.id = count + 2;
      console.log(post.id);
      const data = [...this.state.data, post];
      // data.push(post);
      console.log(data);
      // console.log(this.state.data);
      this.setState({ data, userId: "", id: null, title: "", body: "" });
      // console.log(data);
    }
  };

  handleDelete = async (info) => {
    // e.preventDefault();
    console.log("handle delete");
    const post = await axios.delete(
      "https://jsonplaceholder.typicode.com/posts/" + info.id
    );

    console.log(post);
    const posts = this.state.data.filter((p) => p.id !== info.id);
    this.setState({ data: posts });
  };
  handleUpdate = async (info) => {
    console.log(info);
    info.title = "UPDATED";
    const { data: post } = await axios.patch(
      "https://jsonplaceholder.typicode.com/posts/" + info.id,
      { title: info.title, id: info.id, body: info.body, userId: info.userId }
    );
    console.log(post);
    let posts = [...this.state.data];
    let indvidualItem = posts.filter((item) => item.id === info.id)[0];
    if (indvidualItem) {
      let foundIndex = posts.indexOf(indvidualItem);
      posts[foundIndex] = {
        title: info.title,
        id: info.id,
        body: info.body,
        userId: info.userId
      };
      // posts.splice(foundIndex, 1, {
      //   title: info.title,
      //   id: info.id,
      //   body: info.body,
      //   userId: info.userId
      // });
    }
    this.setState({
      data: posts
    });
  };
  // handleData = () => {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              <h3>Create new post</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    UserId
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      onChange={this.handleId}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Title
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleTitle}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Body
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleBody}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleAdd}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <br />
          <br />
          <br />
          <h3>Recent Posts</h3>

          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>Title</th>
                <th>Body</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((info) => (
                <tr key={info.id}>
                  <td>{info.userId}</td>
                  <td>{info.title}</td>
                  <td>{info.body}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleUpdate(info)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(info)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
