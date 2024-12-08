import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Faculty {
  id: number;
  name: string;
  college_uni: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  faculty: Faculty | null;
  profile_picture: string | null;
  resume: string | null;
  github_link: string | null;
  linkedin_link: string | null;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile and faculty data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch('/api/v1/userprofiles/1'); // Replace with the actual user ID
        const profileData = await profileResponse.json();
        setProfile(profileData);

        const facultiesResponse = await fetch('/api/v1/faculties');
        const facultiesData = await facultiesResponse.json();
        setFaculties(facultiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleFacultyChange = (value: string) => {
    if (profile) {
      const selectedFaculty = faculties.find(faculty => faculty.id.toString() === value);
      setProfile({ ...profile, faculty: selectedFaculty || null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send updated profile to the backend
    try {
      const response = await fetch(`/api/v1/userprofiles/1/`, { // Replace with dynamic user ID if needed
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting the profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.profile_picture || undefined} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing && <Input type="file" accept="image/*" name="profile_picture" />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faculty">Faculty</Label>
            {isEditing ? (
              <Select value={profile.faculty?.id.toString() || ''} onValueChange={handleFacultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map(faculty => (
                    <SelectItem key={faculty.id} value={faculty.id.toString()}>
                      {faculty.name} - {faculty.college_uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={profile.faculty ? `${profile.faculty.name} - ${profile.faculty.college_uni}` : 'Not specified'}
                readOnly
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_link">GitHub Profile</Label>
            <Input
              id="github_link"
              name="github_link"
              type="url"
              value={profile.github_link || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_link">LinkedIn Profile</Label>
            <Input
              id="linkedin_link"
              name="linkedin_link"
              type="url"
              value={profile.linkedin_link || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF)</Label>
              <Input type="file" accept=".pdf" name="resume" />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile;
