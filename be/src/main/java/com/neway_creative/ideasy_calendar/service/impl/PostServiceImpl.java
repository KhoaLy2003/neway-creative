package com.neway_creative.ideasy_calendar.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.neway_creative.ideasy_calendar.dto.request.CreatePostRequest;
import com.neway_creative.ideasy_calendar.entity.Calendar;
import com.neway_creative.ideasy_calendar.entity.Post;
import com.neway_creative.ideasy_calendar.enumeration.StatusEnum;
import com.neway_creative.ideasy_calendar.repository.PostRepository;
import com.neway_creative.ideasy_calendar.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final Cloudinary cloudinary;

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

    @Override
    public void uploadPostImage(MultipartFile file, int id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            try {
                String imageUrl = cloudinary.uploader()
                        .upload(file.getBytes(),
                                ObjectUtils.asMap(
                                        "folder", "NEWAY_CREATIVE",
                                        "public_id", UUID.randomUUID().toString()))
                        .get("url")
                        .toString();
                Post existingPost = post.get();
                existingPost.setThumbnail(imageUrl);

                postRepository.save(existingPost);
            } catch (Exception e) {
                throw new IllegalStateException("Post save failed");
            }
        } else {
            throw new ResourceNotFoundException("No post with id " + id);
        }
    }
}
