import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // To handle navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (values) => {
    // Handle password change logic here
    if (values.newPassword === values.confirmPassword) {
      console.log('Password changed:', values);
      // Add your password change logic (e.g., API call) here
    } else {
      console.log('New password and confirm password do not match!');
    }
  };

  const handleCancel = () => {
    navigate('/movies'); // Navigate to '/movies' on cancel
  };

  return (
    <div className="container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col md={12}>
          <div className="card p-4 rounded">
            <Row gutter={16}>
              {/* Change Password Form Section (Left side) */}
              <Col md={12}>
                <Title level={3} className="text-center mb-4">Change Password</Title>
                <Form onFinish={handleSubmit}>
                  <Form.Item
                    name="currentPassword"
                    rules={[{ required: true, message: 'Please enter your current password!' }]}>
                    <Input.Password
                      name="currentPassword"
                      placeholder="Enter your current password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Please enter a new password!' }]}>
                    <Input.Password
                      name="newPassword"
                      placeholder="Enter your new password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your new password!' }]}>
                    <Input.Password
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-100">
                      Change Password
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="default" onClick={handleCancel} className="w-100">
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              {/* Image Section (Right side) */}
              <Col md={12} className="d-flex align-items-center justify-content-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  alt="Change Password"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
