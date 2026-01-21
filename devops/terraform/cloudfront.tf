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
    response_page_path    = "/404.html"
    response_code         = 404
  }

  custom_error_response {
    error_code            = 403
    error_caching_min_ttl = 10
    response_page_path    = "/404.html"
    response_code         = 404
  }

  default_cache_behavior {
    cache_policy_id            = data.aws_cloudfront_cache_policy.cache_optimized_policy.id
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD", "OPTIONS"]
    target_origin_id           = "${local.resources_name}-sb"
    compress                   = true
    origin_request_policy_id   = data.aws_cloudfront_origin_request_policy.cors_s3_policy.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_seo_policy.id

    viewer_protocol_policy = "redirect-to-https"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.redirect.arn
    }
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

resource "aws_cloudfront_function" "redirect" {
  name    = "${local.resources_name}-redirect"
  runtime = "cloudfront-js-2.0"
  comment = "Function for ${local.resources_name} to redirect to HTML files"
  publish = true
  code    = file("${path.module}/redirect.js")
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${local.resources_name}-oac"
  description                       = "Restricting access to the S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_response_headers_policy" "security_seo_policy" {
  name = "security-seo-headers-policy"

  security_headers_config {
    content_security_policy {
      content_security_policy = "default-src 'self'; script-src 'self' https://*.clarity.ms 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.buymeacoffee.com; connect-src 'self' https://*.clarity.ms https://c.bing.com; frame-src 'self'"
      override                = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "SAMEORIGIN"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    xss_protection {
      protection = true
      mode_block = true
      override   = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "geolocation=(), microphone=(), camera=()"
      override = true
    }
    items {
      header   = "X-Permitted-Cross-Domain-Policies"
      value    = "none"
      override = true
    }
  }
}

data "aws_cloudfront_origin_request_policy" "cors_s3_policy" {
  name = "Managed-CORS-S3Origin"
}

data "aws_cloudfront_cache_policy" "cache_optimized_policy" {
  name = "Managed-CachingOptimized"
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
