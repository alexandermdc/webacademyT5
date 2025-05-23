interface Todo {
  id: string;
  titulo: string;
  criacao: string;
  prazo?: string;
  descricao?: string;
}

const form = document.getElementById("todo-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const deadlineInput = document.getElementById("deadline") as HTMLInputElement;
const descInput = document.getElementById("description") as HTMLTextAreaElement;
const listContainer = document.getElementById("todo-list") as HTMLElement;

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  listContainer.innerHTML = "";

  todos.forEach(todo => {
    const card = document.createElement("div");
    card.className = "col-md-6 mb-3";

    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${todo.titulo}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Criado em: ${new Date(todo.criacao).toLocaleString()}</h6>
          ${todo.prazo ? `<p><strong>Limite:</strong> ${new Date(todo.prazo).toLocaleString()}</p>` : ""}
          ${todo.descricao ? `<p>${todo.descricao}</p>` : ""}
          <button class="btn btn-sm btn-warning me-2 edit-btn">Editar</button>
          <button class="btn btn-sm btn-danger delete-btn">Excluir</button>
          <div class="edit-form d-none mt-3">
            <input class="form-control mb-2 title-edit" value="${todo.titulo}" />
            <input type="datetime-local" class="form-control mb-2 deadline-edit" value="${todo.prazo ? new Date(todo.prazo).toISOString().slice(0,16) : ""}" />
            <textarea class="form-control mb-2 desc-edit">${todo.descricao || ""}</textarea>
            <button class="btn btn-sm btn-success save-edit">Salvar</button>
            <button class="btn btn-sm btn-secondary cancel-edit">Cancelar</button>
          </div>
        </div>
      </div>
    `;

    const editBtn = card.querySelector(".edit-btn")!;
    const deleteBtn = card.querySelector(".delete-btn")!;
    const editForm = card.querySelector(".edit-form") as HTMLElement;
    const saveBtn = card.querySelector(".save-edit")!;
    const cancelBtn = card.querySelector(".cancel-edit")!;

    const titleEdit = card.querySelector(".title-edit") as HTMLInputElement;
    const deadlineEdit = card.querySelector(".deadline-edit") as HTMLInputElement;
    const descEdit = card.querySelector(".desc-edit") as HTMLTextAreaElement;

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    editBtn.addEventListener("click", () => {
      editForm.classList.remove("d-none");
    });

    cancelBtn.addEventListener("click", () => {
      editForm.classList.add("d-none");
    });

    saveBtn.addEventListener("click", () => {
      todo.titulo = titleEdit.value;
      todo.prazo = deadlineEdit.value || undefined;
      todo.descricao = descEdit.value || undefined;
      saveTodos();
      renderTodos();
    });

    listContainer.appendChild(card);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    titulo: titleInput.value,
    criacao: new Date().toISOString(),
    prazo: deadlineInput.value || undefined,
    descricao: descInput.value || undefined
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
  form.reset();
});

renderTodos();
