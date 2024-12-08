'use client'
import React, { useState, useEffect } from 'react';
import { Component } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Faculty {
  id: number
  name: string
  college_uni: string
}

interface UserProfile {
  id: number
  name: string
  email: string
  bio: string | null
  faculty: Faculty | null
  profile_picture: string | null
  resume: string | null
  github_link: string | null
  linkedin_link: string | null
  created_at: string
}

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch user profile and faculties data
    // This is a placeholder. Replace with actual API calls.
    const fetchData = async () => {
      // const profileResponse = await fetch('/api/profile')
      // const profileData = await profileResponse.json()
      // setProfile(profileData)

      // const facultiesResponse = await fetch('/api/faculties')
      // const facultiesData = await facultiesResponse.json()
      // setFaculties(facultiesData)

      // Placeholder data
      setProfile({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        bio: "A passionate developer",
        faculty: { id: 1, name: "Computer Science", college_uni: "Tech University" },
        profile_picture: null,
        resume: null,
        github_link: "https://github.com/johndoe",
        linkedin_link: "https://linkedin.com/in/johndoe",
        created_at: "2023-01-01T00:00:00Z"
      })
      setFaculties([
        { id: 1, name: "Computer Science", college_uni: "Tech University" },
        { id: 2, name: "Electrical Engineering", college_uni: "Tech University" },
      ])
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value })
    }
  }

  const handleFacultyChange = (value: string) => {
    if (profile) {
      const selectedFaculty = faculties.find(f => f.id.toString() === value)
      setProfile({ ...profile, faculty: selectedFaculty || null })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit updated profile to the backend
    // This is a placeholder. Replace with actual API call.
    console.log("Updated profile:", profile)
    setIsEditing(false)
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
            {isEditing && (
              <Input type="file" accept="image/*" name="profile_picture" />
            )}
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
              <Select
                value={profile.faculty?.id.toString()}
                onValueChange={handleFacultyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
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
  )
}
