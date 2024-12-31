resource "aws_cloudfront_distribution" "cd" {
  origin {
    domain_name              = aws_s3_bucket.sb.bucket_regional_domain_name
    origin_id                = "${local.resources_name}-sb"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    connection_attempts      = 3
    connection_timeout       = 10
  }

  aliases = [var.domain_name]

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${local.resources_name} CloudFront Distribution"
  default_root_object = "index.html"

  custom_error_response {
    error_code            = 404
    error_caching_min_ttl = 10
    response_page_path    = "/index.html"
    response_code         = 200
  }

  custom_error_response {
    error_code            = 403
    error_caching_min_ttl = 10
    response_page_path    = "/index.html"
    response_code         = 200
  }

  default_cache_behavior {
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "${local.resources_name}-sb"
    compress = true
    default_ttl = 0
    max_ttl = 0
    origin_request_policy_id   = "acba4595-bd28-49b8-b9fe-13317c0390fa"
    response_headers_policy_id = "60669652-455b-4ae9-85a4-c4c02393f86c"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.certificate.arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
    cloudfront_default_certificate = false
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${local.resources_name}-oac"
  description                       = "Restricting access to the S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.cd.domain_name
}

output "cloudfront_id" {
  value = aws_cloudfront_distribution.cd.id
}

output "domain_name" {
  value = var.domain_name
}
