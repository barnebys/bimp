# Simple service for image processing

Image processing service based on [Sharp](https://github.com/lovell/sharp) and [Micro](https://github.com/zeit/micro).

## How to run

```
$ yarn install
$ now env 
``` 

or


```
$ yarn install
$ yarn run start
``` 

## Deployment

We recommend to use [Now](https://zeit.co/now) together with [Now CDN](https://zeit.co/cdn). See Now CDN documentation for setup.

To deploy this, run the following command.
```
$ now barnebys/bimp
``` 

## Providers

Available providers to be used a source.

### Proxy

When using a valid URL Bimp will function as a proxy and download the image. 

### S3

Add the following environment variables to enable support for S3.

`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_PREFIX`

`$ now barnebys/bimp -e S3_ACCESS_KEY_ID=XXXX -e S3_SECRET_ACCESS_KEY=xxxx -e S3_BUCKET=bucket -e S3_PREFIX=myPrefix`

### Azure

Experimental support. More information to shortly.

### GCS

Experimental support. More information to shortly.

## Security

### Hashed URLs

Securing URLs adds a layer of security to your images, by preventing anyone from altering the URLs. 
Add the environment variable `SECRET` to your build which will be used to sign all URLs.

`$ now barnebys/bimp -e SECRET=MySecret`

### Whitelisting for Proxy

Sometimes you would want to generate URLs on client side and still allow for some security. 
Where a secret would fill no function as it would exposed publicly. There for we allow the possibility to whitelist domains
when using the proxy provider.

The whitelist can be any valid regular expression.

`$ now barnebys/bimp -e WHITELIST=barnebys.com`
   

```
$ now barnebys/bimp -e SECRET=MySecret -e DEFAULT_IMAGE_URL=https://someurl.com/image.jpg
``` 

## Default Image

If the image is missing you can set a default image to be used by adding the environment variable `DEFAULT_IMAGE_URL` on deployment.

```
$ now barnebys/bimp -e DEFAULT_IMAGE_URL=https://someurl.com/image.jpg
``` 

## How to use


`https://<your-fqdn>/<url-or-path>?w=<width>&h=<height>&crop=<mode>`


### Available parameters

| Parameter  | Function |
| ------------- | ------------- |
| `w`  | Image width  |
| `h`  | Image height  |
| `crop`  | Cropping mode  |
| `extract`  | Extract a region of the image   |
| `trim`  | Trim "boring" pixels from all edges   |
| `pad`  | Add padding   |
| `bg`  | Add a color to replace alpha or padded area  |
| `format`  | Set output format  |
| `s`  | Signed hash  |

### Resizing

Resize image to `width` x `height`. When both height and width are use the image will be cropped to the specified size using center as default. 

### Cropping

Crop the resized image to the exact specified size. Default is center.

Possible attributes are `north`, `northeast`, `east`, `southeast`, `south`,
`southwest`, `west`, `northwest`, `center`, `centre`, `entropy` and `attention`.

Other strategies for corpping are:

`entropy`: focus on the region with the highest Shannon entropy.
`attention`: focus on the region with the highest luminance frequency, colour saturation and presenece of skin tones..


### Extract

Extract a region of the image using using left, top, width and height. 
Set left and top as offset and width and height for dimensions to extract.

`extract=<left>,<top>,<width>,<height>`
`extract=0,0,500,200`

### Trim 

Trim "boring" pixels from all edges using a tolerance (maximum of 99).

`trim=10`

### Pad

Add padding to the image

`pad=50`


### Background

Replace alpha channel, or padded area, with a color.

`bg=ffffff`


### Format

Currently only supports `compress` which enables a higher compression.   

`format=compress`

# Clients

[Bimp PHP Client](https://github.com/barnebys/bimp-php)


# Roadmap

* Tiny images
* More sharp features
* More providers