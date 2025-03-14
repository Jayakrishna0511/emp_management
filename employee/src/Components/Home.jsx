import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';  

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result); 
        } else {
          toast.error(result.data.Error);  // Display error toast
        }
      });
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin); 
        }
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOfEmp);
        } else {
          toast.error(result.data.Error); 
        }
      });
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setNewEmail(admin.email); // pre-fill the current email
    setNewPassword(''); // reset the password field
    setShowModal(true); // show the modal
  };

  const handleSaveChanges = () => {
    if (!newEmail) {
      toast.error("Email is required");
      return;
    }

    // Prepare data for submission
    const data = {
      email: newEmail,
      password: newPassword || undefined, // Only send password if it's changed
    };

    axios.put(`http://localhost:3000/auth/edit-admin/${selectedAdmin.id}`, data)
      .then(result => {
        if (result.data.Status) {
          toast.success("Admin updated successfully!");
          AdminRecords();  // Refresh the list of admins
          setShowModal(false);  // Close the modal
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => toast.error("Error updating admin: " + err.message));
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Close the modal
  };

  const deleteAdmin = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this admin?");
    if (confirmation) {
      axios.delete(`http://localhost:3000/auth/delete-admin/${id}`)
        .then(result => {
          if (result.data.Status) {
            toast.success("Admin deleted successfully!");
            AdminRecords();
          } else {
            toast.error(result.data.Error);
          }
        })
        .catch(err => toast.error("Error deleting admin: " + err.message));
    }
  };

  return (
    <div>
      <div className='p-3 d-flex flex-column flex-sm-row justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-100 w-sm-25 mb-3 mb-sm-0'>
          <div className='text-center pb-1'>
            <h4>ADMIN</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-100 w-sm-25 mb-3 mb-sm-0'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total :</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-100 w-sm-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total :</h5>
            <h5>{salaryTotal}₹</h5>
          </div>
        </div>
      </div>

      {/* Admin List - Table */}
      <div className='mt-4 px-3 px-md-5 pt-3'>
        <h3>List Of Admins</h3>
        <table className='table table-responsive'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id}>
                <td>{a.email}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(a)}>EDIT</button>
                  <button className="btn btn-warning btn-sm" onClick={() => deleteAdmin(a.id)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing admin details */}
      <Modal  show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton >
          <Modal.Title >Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password (optional)</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (leave blank to keep unchanged)"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
