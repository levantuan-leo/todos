import { createServer, Model } from "miragejs";

const makeServer = ({ environment = "test" } = {}) => {
  let server = createServer({
    environment,

    models: {
      // user: Model
      todo: Model,
    },

    seeds(server) {
      server.create("todo", {
        id: "1",
        name: "Learn React",
        isCompleted: false,
        priority: "High",
      });
      server.create("todo", {
        id: "2",
        name: "Learn Redux",
        isCompleted: true,
        priority: "Medium",
      });
      server.create("todo", {
        id: "3",
        name: "Learn JavaScript",
        isCompleted: false,
        priority: "Low",
      });
    },

    routes() {
      this.namespace = "fakeApi";

      // get all todos
      this.get("/todos", (schema) => {
        return schema.all("todo");
      });

      // add new todo
      this.post("/todos/add", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        schema.create("todo", payload);
      });

      // update todo
      this.put("/todos/update", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        // get current todo to update via "id"
        let currentTodo = schema.find("todo", payload.id);
        currentTodo.update(payload);
      });
    },
  });

  return server;
};

export { makeServer };
