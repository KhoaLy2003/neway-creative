package com.neway_creative.ideasy_calendar.controller;

import com.neway_creative.ideasy_calendar.constant.MessageConstant;
import com.neway_creative.ideasy_calendar.constant.UriConstant;
import com.neway_creative.ideasy_calendar.dto.request.CreatePostRequest;
import com.neway_creative.ideasy_calendar.dto.response.BaseResponse;
import com.neway_creative.ideasy_calendar.dto.response.PostResponse;
import com.neway_creative.ideasy_calendar.entity.Post;
import com.neway_creative.ideasy_calendar.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(UriConstant.POST_BASE_URI)
@RequiredArgsConstructor
public class PostController {

   @Autowired
   private PostService postService;

   @GetMapping
   public ResponseEntity<BaseResponse> getAllPosts() {
      List<Post> allPosts = postService.getAllPosts();

      if(allPosts.isEmpty() || allPosts == null)
         return ResponseEntity.status(HttpStatus.NO_CONTENT)
                 .body(new BaseResponse(HttpStatus.NO_CONTENT.value(), MessageConstant.GET_POSTS_FAILED, null));

      return ResponseEntity.status(HttpStatus.OK)
              .body(new BaseResponse(HttpStatus.OK.value(), MessageConstant.SUCCESSFUL_MESSAGE, allPosts));
   }

   @PostMapping(UriConstant.POST_CREATE)
   public ResponseEntity<BaseResponse> createPost(@RequestBody CreatePostRequest createPostRequest) {
      if(createPostRequest == null)
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
     if(postId == 0)
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
}
