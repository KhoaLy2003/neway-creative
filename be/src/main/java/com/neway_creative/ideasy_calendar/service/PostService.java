package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.request.CreatePostRequest;
import com.neway_creative.ideasy_calendar.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
   Post createPost(CreatePostRequest createPostRequest);
}
