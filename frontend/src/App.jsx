import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: ''
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students')
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editingId) {
      await updateStudent()
    } else {
      await createStudent()
    }
  }

  const createStudent = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({ firstName: '', lastName: '', email: '', grade: '' })
        fetchStudents()
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error creating student:', error)
    }
  }

  const updateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({ firstName: '', lastName: '', email: '', grade: '' })
        setEditingId(null)
        fetchStudents()
      } else {
        console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      grade: student.grade
    })
    setEditingId(student.id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchStudents()
        if (editingId === id) {
          setEditingId(null)
          setFormData({ firstName: '', lastName: '', email: '', grade: '' })
        }
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ firstName: '', lastName: '', email: '', grade: '' })
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>School Management System</h1>
      </header>

      <main className="app-main">
        <section className="form-section card">
          <h2>{editingId ? 'Edit Student' : 'Add New Student'}</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade/Class</label>
              <input
                id="grade"
                type="text"
                name="grade"
                placeholder="e.g. 10th Grade"
                value={formData.grade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? 'Update Student' : 'Add Student'}
              </button>
              {editingId && (
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="list-section card">
          <h2>All Students</h2>
          <div className="table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">No students found. Add one above!</td>
                  </tr>
                ) : (
                  students.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>{student.grade}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
