
import Button from 'react-bootstrap/Button';
import "./style.css"

const ListTodo = ({ todos, handleDelete, handleEdit, handleCheck }) => {
    return (
        <>
            <div className="container">
                <table border="1px" className="table table-hover" >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>status</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {todos.map((t, index) => (
                            <tr key={t.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => handleCheck(t.id)}
                                    />
                                </td>
                                <td>{t.Task}</td>
                                <td>{t.Description}</td>

                                <td>
                                    <Button variant="outline-success" onClick={() => handleEdit(t.id)}>
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleDelete(t.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListTodo;