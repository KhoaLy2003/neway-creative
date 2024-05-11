package com.neway_creative.ideasy_calendar.service.impl;

import com.neway_creative.ideasy_calendar.dto.request.CreatePostRequest;
import com.neway_creative.ideasy_calendar.entity.Post;
import com.neway_creative.ideasy_calendar.enumeration.StatusEnum;
import com.neway_creative.ideasy_calendar.repository.PostRepository;
import com.neway_creative.ideasy_calendar.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post createPost(CreatePostRequest createPostRequest) {
       Post post = Post.builder()
               .title(createPostRequest.getTitle())
               .description(createPostRequest.getDescription())
               .content(createPostRequest.getContent())
               .thumbnail(createPostRequest.getThumbnail())
               .status(StatusEnum.ACTIVE)
               .build();

       postRepository.save(post);

        return post;
    }

    @Override
    public Post getPostByPostId(int id) {
        Post post = postRepository.findById(id).orElse(null);

        return post;
    }
}
