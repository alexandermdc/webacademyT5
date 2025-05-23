var form = document.getElementById("todo-form");
var titleInput = document.getElementById("title");
var deadlineInput = document.getElementById("deadline");
var descInput = document.getElementById("description");
var listContainer = document.getElementById("todo-list");
var todos = JSON.parse(localStorage.getItem("todos") || "[]");
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function renderTodos() {
    listContainer.innerHTML = "";
    todos.forEach(function (todo) {
        var card = document.createElement("div");
        card.className = "col-md-6 mb-3";
        card.innerHTML = "\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">".concat(todo.title, "</h5>\n          <h6 class=\"card-subtitle mb-2 text-muted\">Criado em: ").concat(new Date(todo.createdAt).toLocaleString(), "</h6>\n          ").concat(todo.deadline ? "<p><strong>Limite:</strong> ".concat(new Date(todo.deadline).toLocaleString(), "</p>") : "", "\n          ").concat(todo.description ? "<p>".concat(todo.description, "</p>") : "", "\n          <button class=\"btn btn-sm btn-warning me-2 edit-btn\">Editar</button>\n          <button class=\"btn btn-sm btn-danger delete-btn\">Excluir</button>\n          <div class=\"edit-form d-none mt-3\">\n            <input class=\"form-control mb-2 title-edit\" value=\"").concat(todo.title, "\" />\n            <input type=\"datetime-local\" class=\"form-control mb-2 deadline-edit\" value=\"").concat(todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 16) : "", "\" />\n            <textarea class=\"form-control mb-2 desc-edit\">").concat(todo.description || "", "</textarea>\n            <button class=\"btn btn-sm btn-success save-edit\">Salvar</button>\n            <button class=\"btn btn-sm btn-secondary cancel-edit\">Cancelar</button>\n          </div>\n        </div>\n      </div>\n    ");
        var editBtn = card.querySelector(".edit-btn");
        var deleteBtn = card.querySelector(".delete-btn");
        var editForm = card.querySelector(".edit-form");
        var saveBtn = card.querySelector(".save-edit");
        var cancelBtn = card.querySelector(".cancel-edit");
        var titleEdit = card.querySelector(".title-edit");
        var deadlineEdit = card.querySelector(".deadline-edit");
        var descEdit = card.querySelector(".desc-edit");
        deleteBtn.addEventListener("click", function () {
            todos = todos.filter(function (t) { return t.id !== todo.id; });
            saveTodos();
            renderTodos();
        });
        editBtn.addEventListener("click", function () {
            editForm.classList.remove("d-none");
        });
        cancelBtn.addEventListener("click", function () {
            editForm.classList.add("d-none");
        });
        saveBtn.addEventListener("click", function () {
            todo.title = titleEdit.value;
            todo.deadline = deadlineEdit.value || undefined;
            todo.description = descEdit.value || undefined;
            saveTodos();
            renderTodos();
        });
        listContainer.appendChild(card);
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var newTodo = {
        id: crypto.randomUUID(),
        title: titleInput.value,
        createdAt: new Date().toISOString(),
        deadline: deadlineInput.value || undefined,
        description: descInput.value || undefined
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    form.reset();
});
renderTodos();
