package com.neway_creative.ideasy_calendar.service;

import com.neway_creative.ideasy_calendar.dto.request.CreatePostRequest;
import com.neway_creative.ideasy_calendar.entity.Post;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();

    Post createPost(CreatePostRequest createPostRequest);

    Post getPostByPostId(int id);

    void uploadPostImage(MultipartFile file, int id);
}
