import React, { Component } from "react";
import Tree from "react-d3-tree";

const myTreeData = [
  {
    name: "Top Level",
    attributes: {
      keyA: "val A",
      keyB: "val B",
      keyC: "val C",
    },
    children: [
      {
        name: "Level 2: A",
        attributes: {
          keyA: "val A",
          keyB: "val B",
          keyC: "val C",
        },
      },
      {
        name: "Level 2: B",
      },
    ],
  },
  {
    name: "Another node",
    attributes: {
      keyA: "Val A",
    },
    children: [],
  },
];

class TreePage extends Component {
  state = {};
  render() {
    return (
      <div
        id="treeWrapper"
        style={{ width: "50em", height: "20em", border: "1px solid black" }}
      >
        <Tree
          data={myTreeData}
          orientation="vertical"
          translate={{ x: "25em", y: "10em" }}
        />
      </div>
    );
  }
}

export default TreePage;
