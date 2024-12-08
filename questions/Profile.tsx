'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '../my-app/src/components/ui/Input';
import Textarea from '../my-app/src/components/ui/Textarea';
import Select from '../my-app/src/components/ui/Select';
import Button from '../my-app/src/components/ui/Button';
import Label from '../my-app/src/components/ui/Label';
import Card from '../my-app/src/components/ui/Card';
import { Avatar, AvatarImage, AvatarFallback } from '../my-app/src/components/ui/Avatar';
import '../questions/styles.css';

interface FormData {
  name: string;
  bio: string;
  profileImage: string;
  country: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    profileImage: '',
    country: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setFormData((prev) => ({
          ...prev,
          profileImage: URL.createObjectURL(file),
        }));
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Card className="profile-form-card">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <Avatar className="mb-4">
        <AvatarImage src={formData.profileImage || '/default-avatar.png'} alt="Profile" />
        <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field"
          placeholder="Enter your name"
        />

        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="textarea-field"
          placeholder="Write a short bio"
        />

        <Label htmlFor="profileImage">Profile Image</Label>
        <Input
          id="profileImage"
          type="file"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleImageChange}
          className="file-input"
          placeholder=""
        />

        <Label htmlFor="country">Country</Label>
        <Select
          id="country"
          value={formData.country}
          onChange={handleInputChange}
          className="select-field"
        >
          <option value="">Select a country</option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="UK">United Kingdom</option>
        </Select>

        <Button type="submit" className="submit-btn">
          Save Changes
        </Button>
      </form>
    </Card>
  );
};

export default Profile;

