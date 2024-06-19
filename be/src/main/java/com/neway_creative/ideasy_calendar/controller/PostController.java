package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.request.CreatePostRequest;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.dto.response.PostResponse;
import com.neway_creative.ideasy_calendar.entity.Post;
import com.neway_creative.ideasy_calendar.service.PostService;
import com.neway_creative.ideasy_calendar.utils.MessageLocalization;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(UriConstant.POST_BASE_URI)
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final MessageLocalization messageLocalization;

    @GetMapping
    public ResponseEntity<BaseResponse> getAllPosts() {
        List<Post> allPosts = postService.getAllPosts();

        if (allPosts.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new BaseResponse(HttpStatus.NO_CONTENT.value(), MessageConstant.GET_POSTS_FAILED, null));

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, allPosts));
    }

    @PostMapping(UriConstant.POST_CREATE)
    public ResponseEntity<BaseResponse> createPost(@RequestBody CreatePostRequest createPostRequest) {
        if (createPostRequest == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.CREATE_POST_FAILED, null));

        Post post = postService.createPost(createPostRequest);

        PostResponse postResponse = PostResponse.builder()
                .title(post.getTitle())
                .description(post.getDescription())
                .content(post.getContent())
                .thumbnail(post.getThumbnail())
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, postResponse));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BaseResponse> getPost(@PathVariable int postId) {
        if (postId == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse(HttpStatus.BAD_REQUEST.value(), MessageConstant.GET_POST_FAILED, null));

        Post post = postService.getPostByPostId(postId);

        PostResponse postResponse = PostResponse.builder()
                .title(post.getTitle())
                .description(post.getDescription())
                .content(post.getContent())
                .thumbnail(post.getThumbnail())
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, postResponse));
    }

    @PostMapping("/upload")
    public ResponseEntity<BaseResponse> uploadPostImage(@RequestParam("id") int id, @RequestParam MultipartFile imageFile) {
        postService.uploadPostImage(imageFile, id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new BaseResponse(HttpStatus.OK.value(), messageLocalization.getLocalizedMessage(MessageConstant.UPLOAD_POST_IMAGE_SUCCESSFULLY), id));
    }
}
