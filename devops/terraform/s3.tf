resource "aws_s3_bucket" "sb" {
  bucket = "${local.resources_name}-sb"
}

resource "aws_s3_bucket_policy" "sbp" {
  bucket = aws_s3_bucket.sb.id

  policy = jsonencode({
    Version = "2008-10-17"
    Id = "PolicyForCloudFrontPrivateContent"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.sb.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cd.arn
          }
        }
      }
    ]
  })
}

output "bucket_name" {
  value = aws_s3_bucket.sb.bucket
}
