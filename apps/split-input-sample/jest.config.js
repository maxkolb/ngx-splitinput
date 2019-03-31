module.exports = {
  name: 'split-input-sample',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/split-input-sample/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
