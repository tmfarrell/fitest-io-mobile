
## fitest-io-mobile

Mobile app for [fitest.io](https://fitest.io/) using React Native + Firebase 

### development 

Activate the `conda` environment: 

```bash
$ conda env create -n fitest-io-mobile --file fitest-io-mobile.conda.yml
$ conda activate fitest-io-mobile
```

Install Javascript dependencies from `package.json`:

```bash 
$ yarn install
```

Run the iOS simulator (assuming you have [Xcode installed](https://mac.install.guide/commandlinetools/3.html)):

```bash
$ yarn ios 
```