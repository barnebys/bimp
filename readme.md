# Simple service for image processing

Image processing service based on Sharp and Micro.

## Installation

`npm install`

## Configuration

...

## Deployment

We recommend to use Now together with Now CDN. See Now CDN documentation for setup.


## How to use


`https://<your-fqdn>/<url-or-path>?w=<width>&h=<height>&crop=<mode>`


### Available parameters

| Parameter  | Function |
| ------------- | ------------- |
| `w`  | Image width  |
| `h`  | Image height  |
| `crop`  | Cropping mode  |
| `s`  | Signed hash  |

### Resizing

Resize image to `width` x `height`. When both height and width are use the image will be cropped to the specified size using center as default. 

### Cropping

Crop the resized image to the exact specified size. Default is center.

Possible attributes are `north`, `northeast`, `east`, `southeast`, `south`,
`southwest`, `west`, `northwest`, `center`, `centre`, `entropy` and `attention`.


#### Entropy

`entropy`: focus on the region with the highest Shannon entropy.
`attention`: focus on the region with the highest luminance frequency, colour saturation and presenece of skin tones..


## Clients

...


# Roadmap

* More sharp features
* Add S3 